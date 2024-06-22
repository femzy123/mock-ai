'use client'

import { WebcamIcon } from "lucide-react"
import Webcam from "react-webcam"

type Props = {}

const RecordAnswerSection = (props: Props) => {
  return (
    <div>
      <WebcamIcon size={200} />
      <Webcam />
    </div>
  )
}

export default RecordAnswerSection