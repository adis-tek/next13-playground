import { Fragment } from "react";

export interface Props {
  products: Products[];
  username: string;
}
export interface Products {
  id: string;
  title: string;
}

function UserProfilePage(props: Props) {
  return (
    <Fragment>
      <h1>The User Profile</h1>
      <p>{props.username}</p>
    </Fragment>
  );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
