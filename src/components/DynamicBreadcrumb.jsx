import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Optionally map route segments to friendly names
const routeNameMap = {
  "": "Home",
  settings: "Settings",
  account: "Account",
  "user-profile": "User Profile",
  bookmarks: "Bookmarks",
  subscriptions: "Subscriptions",
  trending: "Trending",
  liked: "Liked Bookmarks",
  favorites: "Favorites",
};

function toTitleCase(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function DynamicBreadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const paths = segments.map((seg, idx) =>
    "/" + segments.slice(0, idx + 1).join("/")
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const name = routeNameMap[seg] || toTitleCase(seg);
          return (
            <React.Fragment key={seg + idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={paths[idx]}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
