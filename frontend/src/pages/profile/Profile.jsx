import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEdit,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaTimes,
} from 'react-icons/fa';

const Profile = () => {
  const base = 'http://localhost:5000';
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    location: '',
    interests: [],
    bio: '',
    coursesPurchased: [],
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.get(`${base}/api/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = response.data;
      setProfile(profileData);
      setEditedProfile(profileData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error fetching profile';
      setError(errorMessage);
      console.error('Error fetching user profile:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    setError('');
    try {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.put(
        `${base}/api/v1/users/profile-update`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setProfile(response.data);
      setIsEditing(false);
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error updating profile';
      setError(errorMessage);
      console.error('Error updating profile:', errorMessage);
      return false;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map((item) => item.trim());
    setEditedProfile((prev) => ({
      ...prev,
      interests,
    }));
  };

  const handleSave = async () => {
    const success = await updateProfile(editedProfile);
    if (!success) {
      setEditedProfile(profile); // Reset to original profile if update fails
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div className="absolute top-4 right-4 flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile({ ...profile });
                  }}
                  className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <FaEdit className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          <div className="p-8">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <img
                src={profile.image}
                onError={handleImageError}
                alt={profile.name}
                className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                loading="lazy"
              />
            </div>

            <div className="text-center mb-8">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="age"
                    value={editedProfile.age}
                    onChange={handleInputChange}
                    className="text-gray-600 text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  />
                </div>
              ) : (
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600">Age: {profile.age}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={editedProfile.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="location"
                        value={editedProfile.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="w-5 h-5 mr-3" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="w-5 h-5 mr-3" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="w-5 h-5 mr-3" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Professional Interests
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.interests.join(', ')}
                      onChange={handleInterestsChange}
                      className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                      placeholder="Enter interests separated by commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Bio
                  </h2>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editedProfile.bio}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                      rows="4"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.bio}</p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Courses Purchased
                  </h2>
                  <div className="space-y-4">
                    {profile.coursesPurchased.map((course, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-gray-800 font-medium">
                              {course.name}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {course.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
