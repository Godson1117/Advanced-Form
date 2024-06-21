import React, { useState, useEffect } from 'react';

const Modal = ({ data, qs }) => {

    const [open, setOpen] = useState(data ? true : false);
    console.log(qs);

    useEffect(() => {
        if (data) {
            setOpen(true);
        }
    }, [data]);

    return (
        open && (
            <div
                className="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="modal-title"
                aria-modal="true"
                role="dialog"
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className="fixed inset-0 transition-opacity duration-300"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:w-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Form Submitted
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Name: {data.fullName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Email: {data.email}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Survey Topic: {data.surveyTopic}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Technology' && `Fav Programming Language: ${data.favoriteProgrammingLanguage}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Technology' && `Years Of Experience: ${data.yearsOfExperience}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Health' && `Exercise Frequency: ${data.exerciseFrequency}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Health' && `Diet Preference: ${data.dietPreference}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Education' && `Highest Qualification: ${data.highestQualification}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.surveyTopic === 'Education' && `Field of Study: ${data.fieldOfStudy}`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Feedback: {data.feedback}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-md leading-5 font-medium text-gray-900">Additional Questions:</h4>
                                        {qs.map((q, i) => (
                                            <p key={i} className="text-sm text-gray-500">
                                                {i + 1}. {q}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                    setOpen(false);
                                    window.location.reload();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
