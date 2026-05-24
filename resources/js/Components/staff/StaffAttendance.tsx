import { useForm } from "@inertiajs/react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

type Props = {
    onClose: () => void;
};

export default function StaffAttendanceModal({ onClose }: Props) {
    const webcamRef = useRef<Webcam>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        photo: null as File | null,
        latitude: "",
        longitude: "",
    });

    // const getGPSLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setData((data) => ({
    //                     ...data,
    //                     latitude: position.coords.latitude.toString(),
    //                     longitude: position.coords.longitude.toString(),
    //                 }));
    //                 alert("📍 GPS Location locked successfully!");
    //             },
    //             (error) => {
    //                 alert(
    //                     "Failed to fetch location. Please ensure location access is enabled!",
    //                 );
    //             },
    //         );
    //     } else {
    //         alert("Your browser does not support GPS Geolocation.");
    //     }
    // };
    const getGPSLocation = () => {
        if (!navigator.geolocation) {
            MySwal.fire({
                title: "Not Supported",
                text: "Your browser does not support GPS Geolocation features.",
                icon: "error",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        MySwal.fire({
            title: "Locating Device...",
            text: "Securing satellite connection for high-accuracy coordinates.",
            allowOutsideClick: false,
            didOpen: () => MySwal.showLoading(),
        });

        let isLocationLocked = false;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (isLocationLocked) return;
                isLocationLocked = true;

                setData((prevData) => ({
                    ...prevData,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                }));

                MySwal.fire({
                    title: "Location Locked!",
                    text: "GPS Coordinates verified successfully.",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                    timer: 1500,
                });
            },
            (error) => {
                MySwal.fire({
                    title: "Access Denied",
                    text: "Failed to fetch coordinates. Please check your browser's location permissions.",
                    icon: "error",
                    confirmButtonColor: "#dc2626",
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            },
        );
    };
    const base64ToFile = (base64String: string, filename: string): File => {
        const arr = base64String.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setImgPreview(imageSrc);
                const fileFoto = base64ToFile(
                    imageSrc,
                    "attendance_selfie.jpg",
                );
                setData("photo", fileFoto);
            }
        }
    }, [webcamRef]);
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!data.photo) {
    //         alert("Please take a selfie photo first!");
    //         return;
    //     }
    //     post(route('attendance.store'), {
    //         onSuccess: () => onClose(),
    //     });
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.photo) {
            MySwal.fire({
                title: "Photo Required",
                text: "Please capture your selfie verification image before submitting.",
                icon: "warning",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        if (!data.latitude || !data.longitude) {
            MySwal.fire({
                title: "Coordinates Required",
                text: "Please lock your GPS location coordinates before submitting.",
                icon: "warning",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        post(route("attendance.store"), {
            onBefore: () => {
                MySwal.fire({
                    title: "Submitting Attendance...",
                    text: "Uploading verification image and locking location records.",
                    allowOutsideClick: false,
                    didOpen: () => MySwal.showLoading(),
                });
            },
            onSuccess: (page) => {
                const flash = page.props.flash as {
                    success?: string;
                    error?: string;
                };

                if (flash.error) {
                    MySwal.fire({
                        title: "Attendance Rejected",
                        text: flash.error,
                        icon: "error",
                        confirmButtonColor: "#dc2626",
                    });
                } else {
                    onClose();
                    MySwal.fire({
                        title: "Attendance Success!",
                        text:
                            flash.success ||
                            "Your attendance record has been secured.",
                        icon: "success",
                        confirmButtonColor: "#10b981",
                        timer: 2000,
                    });
                }
            },
            onError: () => {
                MySwal.fire({
                    title: "Submission Failed",
                    text: "Validation error or network issues.",
                    icon: "error",
                    confirmButtonColor: "#dc2626",
                });
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent  p-4">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-xl shadow-2xl animate-fade-in">
                <div className="flex items-center justify-between border-b p-4 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">
                        Attendance Form
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xl"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex flex-col items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700 self-start">
                            Selfie Verification
                        </label>

                        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner relative flex items-center justify-center border">
                            {imgPreview ? (
                                <img
                                    src={imgPreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={{ facingMode: "user" }}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {imgPreview ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setImgPreview(null);
                                    setData("photo", null);
                                }}
                                className="text-xs text-red-500 font-semibold underline mt-1"
                            >
                                Retake Photo
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={capturePhoto}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white text-xs py-2 rounded-lg font-bold transition"
                            >
                                📸 Snap Screenshot
                            </button>
                        )}
                        {errors.photo && (
                            <p className="text-red-500 text-xs">
                                {errors.photo}
                            </p>
                        )}
                    </div>

                    <div className="mb-6  pt-4">
                        <button
                            type="button"
                            onClick={getGPSLocation}
                            className="w-full mb-3 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
                        >
                            📍 Fetch GPS Coordinates Automatically
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase">
                                    Latitude
                                </label>
                                <input
                                    type="text"
                                    value={data.latitude}
                                    readOnly
                                    placeholder="Not locked yet"
                                    className="w-full mt-1 bg-gray-50 border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    value={data.longitude}
                                    readOnly
                                    placeholder="Not locked yet"
                                    className="w-full mt-1 bg-gray-50 border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-0"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {processing ? "Submitting..." : "Submit Attendance"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
