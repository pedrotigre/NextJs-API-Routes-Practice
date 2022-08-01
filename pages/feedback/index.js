import { getFeedbackPath, getFileData } from '../api/feedback';

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
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
