import {Outlet} from "react-router-dom";

import Base from "../Base";

export default function NoHeaderAndFooter({ isLoading }) {
  return (
    <Base isLoading={isLoading}>
      <Outlet/>
    </Base>
  )
}