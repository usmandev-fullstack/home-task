// ** Icon Imports
import { Icon, IconProps } from '@iconify/react'

const IconifyIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} fontSize='1.375rem' {...rest} />
}

export const DetailsIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17 11.9474H10.6M17 14.4737H10.6M13.8 17H10.6M5 4.36842H12.8C14.4856 4.36842 15.328 4.36842 15.9336 4.79453C16.1954 4.97873 16.4202 5.21537 16.5952 5.49095C17 6.12842 17 7.22568 17 9M9 4.36842L8.4936 3.30147C8.0736 2.41726 7.6896 1.528 6.7592 1.16084C6.352 1 5.8864 1 4.9552 1C3.5024 1 2.776 1 2.2304 1.32C1.84166 1.54832 1.52091 1.88596 1.304 2.29516C1 2.86947 1 3.63411 1 5.16337V7.73684C1 11.7065 1 13.6914 2.1712 14.9242C3.2112 16.0189 4.8144 16.1427 7.8 16.1562" stroke="#122349" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default IconifyIcon