import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem';
const TrainerMenu = () => {
    return (
        <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Manage Slots'
        address='manage-slots'
      />
      <MenuItem icon={MdHomeWork} label='Add New slot' address='add-new-slot' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Add new Forum'
        address='add-new-forum'
      />
    </>
    );
};

export default TrainerMenu;