import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Booking = () => {
  const { trainerId, slotId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    // Fetch trainer and slot details from backend
    fetch(`/booking/${trainerId}/${slotId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainer(data.trainer);
        setSlot(data.slot);
      })
      .catch((error) =>
        console.error("Error fetching booking details:", error)
      );
  }, [trainerId, slotId]);

  return (
  <div>
    <h1>Booking for {trainer.name}</h1>
    <p>Slot: {slot.time}</p>
    {/* Add a booking form here */}
  </div>
);
};

export default Booking;
