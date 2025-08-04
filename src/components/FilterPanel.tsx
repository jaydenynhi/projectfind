import React, { useState } from 'react';
import { X, MapPin, Tag, Wifi, Calendar } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const FilterPanel: React.FC = () => {
  const { filters, setFilters } = useProjects();
  const [localFilters, setLocalFilters] = useState(filters);

  const availableTags = [
    'Tech', 'Environment', 'Education', 'Health', 'Food', 'Sustainability',
    'Mobile App', 'Community', 'Local Business', 'Logistics', 'Smart Cities'
  ];

  const timelineOptions = [
    { value: '', label: 'All Timelines' },
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      tags: [],
      remote: false,
      timeline: ''
    };
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    setLocalFilters({ ...localFilters, tags: newTags });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <MapPin size={16} />
            <span>Location</span>
          </label>
          <input
            type="text"
            placeholder="Enter city, state, or country..."
            value={localFilters.location}
            onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tags Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Tag size={16} />
            <span>Categories</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  localFilters.tags.includes(tag)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Remote Work Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Wifi size={16} />
            <span>Work Type</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.remote}
                onChange={(e) => setLocalFilters({ ...localFilters, remote: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Remote only</span>
            </label>
          </div>
        </div>

        {/* Timeline Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Calendar size={16} />
            <span>Project Status</span>
          </label>
          <select
            value={localFilters.timeline}
            onChange={(e) => setLocalFilters({ ...localFilters, timeline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Display */}
        {(localFilters.location || localFilters.tags.length > 0 || localFilters.remote || localFilters.timeline) && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {localFilters.location && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  <span>📍 {localFilters.location}</span>
                  <button
                    onClick={() => setLocalFilters({ ...localFilters, location: '' })}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {localFilters.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                  <span>🏷️ {tag}</span>
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 hover:text-secondary-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {localFilters.remote && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm">
                  <span>🌐 Remote only</span>
                  <button
                    onClick={() => setLocalFilters({ ...localFilters, remote: false })}
                    className="ml-1 hover:text-accent-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {localFilters.timeline && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  <span>📅 {timelineOptions.find(opt => opt.value === localFilters.timeline)?.label}</span>
                  <button
                    onClick={() => setLocalFilters({ ...localFilters, timeline: '' })}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleApplyFilters}
            className="flex-1 btn-primary"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 