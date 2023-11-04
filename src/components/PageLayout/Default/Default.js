import {Outlet} from "react-router-dom";

import Base from "../Base";
import Header from "../../Header";
import Footer from '../../Footer';

export default function Default({theme}) {
  return (
    <Base>
      <Header theme={theme}/>
      <Outlet/>
      <Footer/>
    </Base>
  )
}