import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { userInfoStore } from "../stores/userInfo";

export const Profile = () => {
  const userInfoState = userInfoStore((state) => state.userInfo);

  return (
    <div>
      <Header></Header>
      <Section>
        {" "}
        <p>User Name: {userInfoState.userName}</p>
        <p>User ID: {userInfoState.id}</p>
        <p>Email: {userInfoState.email}</p>
      </Section>
      <Footer></Footer>
    </div>
  );
};
