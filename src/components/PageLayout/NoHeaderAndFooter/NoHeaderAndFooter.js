import {Outlet} from "react-router-dom";

import Base from "../Base";

export default function NoHeaderAndFooter() {
  return (
    <Base>
      <Outlet/>
    </Base>
  )
}