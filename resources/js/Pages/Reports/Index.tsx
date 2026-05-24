import ReportsTable from '@/Components/Reports/ReportsTable'
import { Attendance, PageProps } from '@/types'

interface props extends PageProps{
  attendances:Attendance[]
}

const Index = ({ attendances }: props) => {
  return (
   <div><ReportsTable attendances={attendances} /></div>
  )
}

export default Index