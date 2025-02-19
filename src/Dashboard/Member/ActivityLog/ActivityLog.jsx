import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";

const ActivityLog = () => {
  const [role] = useRole();
  console.log(role);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const axiosSecure = useAxiosSecure();
    const userId = "user123"; // replace with dynamic value

    axiosSecure.get(`/api/activity-log/${userId}`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activity log:", error);
      });
  }, []);

  const handleEyeClick = (rejectionMessage) => {
    setFeedback(rejectionMessage);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleReject = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject it!",
      cancelButtonText: "No, Keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/reject-application", {
            applicationId,
            rejectionMessage: "Not suitable at this time",
          })
          .then(() => {
            Swal.fire(
              "Rejected!",
              "The application has been rejected.",
              "success"
            );
            setApplications(
              applications.filter((app) => app._id !== applicationId)
            ); 
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "There was an issue rejecting the application.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="activity-log-container">
      <h1>Activity Log</h1>
      <table className="activity-log-table">
        <thead>
          <tr>
            <th>Trainer Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="3">No applications found.</td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application._id}>
                <td>{application.name}</td>
                <td>{application.status}</td>
                <td>
                  {application.status === "Rejected" && (
                    <button
                      onClick={() =>
                        handleEyeClick(application.rejectionMessage)
                      }
                      className="eye-icon"
                    >
                      👁️
                    </button>
                  )}
                  {application.status === "Pending" && (
                    <button
                      onClick={() => handleReject(application._id)}
                      className="reject-button"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Rejection Message</h2>
            <p>{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
