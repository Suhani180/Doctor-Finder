
function DoctorCard({ doctor }) {
  return (
    <div data-testid="doctor-card" className="p-4 border rounded shadow mb-4 bg-white">
      <h2 data-testid="doctor-name" className="text-lg font-bold">{doctor.name}</h2>
      <p data-testid="doctor-specialty">{doctor.specialty.join(", ")}</p>
      <p data-testid="doctor-experience">{doctor.experience} years experience</p>
      <p data-testid="doctor-fee">₹{doctor.fee}</p>
    </div>
  );
}

export default DoctorCard;
