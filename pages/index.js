import { useRef, useState } from 'react';

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitFeedbackMessage, setSubmitFeedbackMessage] = useState();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    if (enteredEmail.length === 0 || enteredFeedback.length === 0) {
      return setSubmitFeedbackMessage('Fields cannot be empty!');
    }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setSubmitFeedbackMessage(data.message));
  }

  function getFeedbackData(event) {
    event.preventDefault();

    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedback));
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <br />
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <br />
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit</button>
        {submitFeedbackMessage && <p>{submitFeedbackMessage}</p>}
      </form>
      <div>
        <hr />
        <button onClick={getFeedbackData}>Show feedbacks</button>
        <ul>
          {feedbacks.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
