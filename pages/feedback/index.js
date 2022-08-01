import { getFeedbackPath, getFileData } from '../api/feedback';
import { useState } from 'react';

function FeedbackPage(props) {
  const [feedbackEmail, setFeedbackEmail] = useState();
  // NO NEED FOR FETCH, JUST AN EXAMPLE OF DYNAMIC API FETCH (WE COULD JUST USE THE PROPS)
  function loadFeedbackIdHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackEmail(data.feedback.email));
  }
  return (
    <>
      {feedbackEmail && <p>{feedbackEmail}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <button onClick={loadFeedbackIdHandler.bind(null, item.id)}>
              Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  // let feedbackItems;
  // await fetch(`${process.env.SERVER}/api/feedback`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     feedbackItems = data.feedback;
  //   });
  // return { props: { feedbackItems } };
  // ** NO NEED TO FETCH DATA, WE CAN LEVERAGE THE FACT THAT THIS API IS RUNNING ON OUR SERVER (INTERNAL API)

  const filePath = getFeedbackPath();
  const data = await getFileData(filePath);

  // IT'S ALSO IMPORTANT TO NOT RETURN ANY STATUS CODE FROM THIS FUNCTIONS, SINCE THIS IS NOT THE PURPOSE OF getStaticProps

  return { props: { feedbackItems: data } };
}

export default FeedbackPage;
