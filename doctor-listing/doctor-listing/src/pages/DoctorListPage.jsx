
import { useEffect, useState } from "react";
import { fetchDoctors } from "../utils/api";
import { useQueryParams } from "../utils/queryParams";
import Header from "../components/Header";
import FilterPanel from "../components/FilterPanel";
import DoctorCard from "../components/DoctorCard";

function DoctorListPage() {
  const { searchParams, updateParams } = useQueryParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [filters, setFilters] = useState({
    mode: searchParams.get('mode') || '',
    specialties: searchParams.get('specialties') ? searchParams.get('specialties').split(',') : [],
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
  });

  useEffect(() => {
    fetchDoctors().then(data => setDoctors(data));
  }, []);

  useEffect(() => {
    let temp = [...doctors];

    if (filters.search) {
      temp = temp.filter(doc => doc.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.mode) {
      temp = temp.filter(doc => doc.mode === filters.mode);
    }
    if (filters.specialties.length > 0) {
      temp = temp.filter(doc => filters.specialties.includes(doc.specialty[0]));
    }
    if (filters.sort === 'fees') {
      temp.sort((a, b) => a.fee - b.fee);
    }
    if (filters.sort === 'experience') {
      temp.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(temp);

    updateParams({
      mode: filters.mode || null,
      specialties: filters.specialties.length ? filters.specialties.join(',') : null,
      search: filters.search || null,
      sort: filters.sort || null,
    });

  }, [filters, doctors]);

  const handleFilterChange = (type, value) => {
    if (type === 'specialties') {
      setFilters(prev => {
        const alreadySelected = prev.specialties.includes(value);
        return {
          ...prev,
          specialties: alreadySelected
            ? prev.specialties.filter(s => s !== value)
            : [...prev.specialties, value],
        };
      });
    } else {
      setFilters(prev => ({ ...prev, [type]: value }));
    }
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({ ...prev, sort: value }));
  };

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  return (
    <div className="flex">
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <div className="flex-1 p-4">
        <Header doctors={doctors} onSearch={handleSearch} />
        <div className="grid gap-4 mt-4">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorListPage;
