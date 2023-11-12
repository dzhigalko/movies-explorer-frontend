import {Outlet} from "react-router-dom";

import Base from "../Base";
import Header from "../../Header";
import Footer from '../../Footer';

export default function Default({theme, isLoading}) {
  return (
    <Base isLoading={isLoading}>
      <Header theme={theme}/>
      <Outlet/>
      <Footer/>
    </Base>
  )
}