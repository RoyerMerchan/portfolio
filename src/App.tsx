import { MotionConfig } from 'framer-motion'
import RoyerOS from '@/components/royeros/RoyerOS'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RoyerOS />
    </MotionConfig>
  )
}
