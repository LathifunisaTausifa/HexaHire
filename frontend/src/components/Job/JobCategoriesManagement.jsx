import React, { useState } from 'react';

const JobCategoriesManagement=() => {
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const addCategory = (e) => {
    e.preventDefault();
    if (categoryType && categoryName) {
      setCategories([...categories, { id: Date.now(), type: categoryType, name: categoryName }]);
      setCategoryType('');
      setCategoryName('');
    }
  };

  const updateCategory = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...editingCategory, type: categoryType, name: categoryName } : cat
      ));
      setEditingCategory(null);
      setCategoryType('');
      setCategoryName('');
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setCategoryType(category.type);
    setCategoryName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setCategoryType('');
    setCategoryName('');
  };

  const departments = categories.filter(cat => cat.type === 'Department');
  const locations = categories.filter(cat => cat.type === 'Location');
  const employmentTypes = categories.filter(cat => cat.type === 'Employment Type');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Job Categories Management</h1>

      {/* Category Management Form */}
      <form onSubmit={editingCategory ? updateCategory : addCategory} className="mb-4">
        <div className="mb-2">
          <label htmlFor="categoryType" className="block mb-1">Category Type</label>
          <select
            id="categoryType"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select category type</option>
            <option value="Department">Department</option>
            <option value="Location">Location</option>
            <option value="Employment Type">Employment Type</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="categoryName" className="block mb-1">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter the category name"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          {editingCategory ? 'Update Category' : 'Add Category'}
        </button>
        {editingCategory && (
          <button type="button" onClick={cancelEditing} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </form>

      {/* Categories List */}
      <table className="w-full border-collapse border mb-8">
        <thead>
          <tr>
            <th className="border p-2">Category Type</th>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border p-2">{category.type}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <button onClick={() => startEditing(category)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => deleteCategory(category.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Job Creation Form */}
      <h2 className="text-2xl font-bold mb-4">Job Creation</h2>
      <form className="mb-4">
        <div className="mb-2">
          <label htmlFor="department" className="block mb-1">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="location" className="block mb-1">Job Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a job location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="employmentType" className="block mb-1">Employment Type</label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select employment type</option>
            {employmentTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Job</button>
      </form>
    </div>
  );
}

export default JobCategoriesManagement;