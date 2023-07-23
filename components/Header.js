import Example from '../pages/Example';
import Logo from './icons/Logo';

const Header = () => {
  return (
    <div className="flex justify-between items-center   bg-green-600 p-3 w-full mb-2">
      <Logo></Logo>
      <Example></Example>
    </div>
  );
}

export default Header
