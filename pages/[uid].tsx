import { Fragment } from "react";

export interface Props {
  products: Products[];
  id: string;
}
export interface Products {
  id: string;
  title: string;
}

function UserIdPage(props: Props) {
  return (
    <Fragment>
      <h1>{props.id}</h1>
    </Fragment>
  );
}

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userId-" + userId,
    },
  };
}
