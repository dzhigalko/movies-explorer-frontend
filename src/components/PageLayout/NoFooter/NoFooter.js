import {Outlet} from "react-router-dom";

import Base from "../Base";
import Header from "../../Header";

export default function NoFooter({theme, isLoading}) {
  return (
    <Base isLoading={isLoading}>
      <Header theme={theme}/>
      <Outlet/>
    </Base>
  )
}