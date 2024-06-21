import { ThreeDots } from 'react-loader-spinner';

export default function Loader({ color = 'darkblue' }) {
  return (
    <ThreeDots
      visible={true}
      height="36"
      width="80"
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
}
