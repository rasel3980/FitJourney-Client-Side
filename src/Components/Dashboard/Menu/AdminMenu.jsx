import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All Newsletter subscribers" address="newsletter-subscribers" />
      <MenuItem icon={FaUserCog} label="All Trainers" address="all-trainers"></MenuItem>
      <MenuItem icon={FaUserCog} label="Applied Trainer" address="applied-trainer"></MenuItem>
      <MenuItem icon={FaUserCog} label="Balance" address="balance"></MenuItem>
      <MenuItem icon={FaUserCog} label="Add new Class" address="add-new-class"></MenuItem>
    </>
  );
};

export default AdminMenu;
