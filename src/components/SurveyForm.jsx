import React, { useState } from 'react';
import { useForm } from '../hooks/useform';
import Modal from './Model';
import fetchAdditionalQuestions from '../utils/apiService';

const SurveyForm = () => {

  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';

    if (values.surveyTopic === 'Technology') {
      if (!values.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!values.yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
    }

    if (values.surveyTopic === 'Health') {
      if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
      if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
    }

    if (values.surveyTopic === 'Education') {
      if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
      if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }

    if (!values.feedback || values.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }

    return errors;
  };

  const { values, handleChange, } = useForm(initialValues, validate);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  let extraqs = []

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = validate(values);
    setErrors(noErrors);

    if (Object.keys(noErrors).length === 0) {
      const extraqs = await fetchAdditionalQuestions(values.surveyTopic);
      setAdditionalQuestions(extraqs);
      setOpen(true);
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-sky-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Survey Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            className={`mt-1 block w-full ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Survey Topic</label>
          <select
            name="surveyTopic"
            value={values.surveyTopic}
            onChange={handleChange}
            className={`mt-1 block w-full ${errors.surveyTopic ? 'border-red-500' : ''}`}
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Favorite Programming Language</label>
              <select
                name="favoriteProgrammingLanguage"
                value={values.favoriteProgrammingLanguage}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.favoriteProgrammingLanguage ? 'border-red-500' : ''}`}
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={values.yearsOfExperience}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.yearsOfExperience ? 'border-red-500' : ''}`}
              />
              {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
            </div>
          </>
        )}

        {values.surveyTopic === 'Health' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={values.exerciseFrequency}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.exerciseFrequency ? 'border-red-500' : ''}`}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Diet Preference</label>
              <select
                name="dietPreference"
                value={values.dietPreference}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.dietPreference ? 'border-red-500' : ''}`}
              >
                <option value="">Select Diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
            </div>
          </>
        )}

        {values.surveyTopic === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Highest Qualification</label>
              <select
                name="highestQualification"
                value={values.highestQualification}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.highestQualification ? 'border-red-500' : ''}`}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                onChange={handleChange}
                className={`mt-1 block w-full ${errors.fieldOfStudy ? 'border-red-500' : ''}`}
              />
              {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Feedback</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            className={`mt-1 block w-full ${errors.feedback ? 'border-red-500' : ''}`}
            rows="4"
          ></textarea>
          {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
        </div>

        {additionalQuestions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700">{question.question}</label>
                <input
                  type="text"
                  name={`additionalQuestion${index}`}
                  value={values[`additionalQuestion${index}`] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {open && <Modal data={values} qs={additionalQuestions} />}
    </div>
  );
};

export default SurveyForm;

