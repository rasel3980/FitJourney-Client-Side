import { useState } from "react";
import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from "./MenuItem";

const Member = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <MenuItem icon={BsFingerprint} label='Activity Log' address='Activity-Log' />
      <MenuItem icon={BsFingerprint} label='Booked Trainer' address='booked-trainer' />
    </>
  );
};

export default Member;
