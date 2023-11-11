import {Outlet} from "react-router-dom";

import Base from "../Base";
import Header from "../../Header";

export default function NoFooter({theme}) {
  return (
    <Base>
      <Header theme={theme}/>
      <Outlet/>
    </Base>
  )
}