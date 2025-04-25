
const specialties = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist", "Physiotherapist",
  "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist",
  "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist",
  "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist",
  "Ayurveda", "Homeopath"
];

function FilterPanel({ filters, onFilterChange, onSortChange }) {
  return (
    <div className="p-4 border-r w-72">
      <div>
        <h2 data-testid="filter-header-moc" className="font-bold mb-2">Consultation Mode</h2>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="radio"
              name="mode"
              value="Video"
              checked={filters.mode === "Video"}
              onChange={() => onFilterChange('mode', 'Video')}
              data-testid="filter-video-consult"
            /> Video Consult
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="In Clinic"
              checked={filters.mode === "In Clinic"}
              onChange={() => onFilterChange('mode', 'In Clinic')}
              data-testid="filter-in-clinic"
            /> In Clinic
          </label>
        </div>
      </div>

      <div className="mt-6">
        <h2 data-testid="filter-header-speciality" className="font-bold mb-2">Speciality</h2>
        <div className="flex flex-col gap-1">
          {specialties.map((specialty) => (
            <label key={specialty}>
              <input
                type="checkbox"
                value={specialty}
                checked={filters.specialties.includes(specialty)}
                onChange={() => onFilterChange('specialties', specialty)}
                data-testid={`filter-specialty-${specialty.replace(/[/\s]/g, "-")}`}
              /> {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 data-testid="filter-header-sort" className="font-bold mb-2">Sort By</h2>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => onSortChange('fees')}
              data-testid="sort-fees"
            /> Fees (Low to High)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => onSortChange('experience')}
              data-testid="sort-experience"
            /> Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
