// ** Type import
import { useRouter } from "next/router";
import { VerticalNavItemsType } from "@/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  const router = useRouter();

  return [
    {
      title: "Dashboard",
      icon: "/icons/dashboard.png",
      size: "19px",
      fontsize: "14px",
      path: "/hey",
      sub: false,
      hide: false,
      mid: "last",
      isSvg: true,
      outer: true,
      isActive: router.asPath == "/",
      badgeContent: "10",
      badgeColor: "default",
    },
    {
      title: "Tools",
      isSvg: true,
      icon: "/icons/tools.png",
      size: "18px",
      fontsize: "14px",
      hide: false,
      children: [
        {
          title: "Assets",
          icon: "",
          size: "8px",
          fontsize: "14px",
          path: "/assets/",
          sub: true,
          isSvg: true,
          mid: "first",
          hide: false,
          isActive: router.asPath == "/assets/" || router.asPath == "/assets",
        },
        {
          title: "Actions",
          icon: "",
          sub: true,
          hide: false,
          mid: "first",
          isSvg: false,
          size: "9px",
          fontsize: "14px",
          children: [
            {
              title: "Some Action",
              icon: "",
              isSvg: true,
              size: "9px",
              fontsize: "14px",
              path: "/some-action/",
              sub: true,
              isActive:
                router.asPath == "/some-action/" ||
                router.asPath == "/some-action",
              mid: "last",
            },
          ],
        },
        {
          title: "Challenges",
          icon: "",
          sub: true,
          hide: false,
          mid: "first",
          isSvg: false,
          size: "9px",
          fontsize: "14px",
          children: [
            {
              title: "Some Challenges",
              icon: "",
              isSvg: true,
              size: "9px",
              fontsize: "14px",
              path: "/some-challenges/",
              sub: true,
              isActive:
                router.asPath == "/some-challenges/" ||
                router.asPath == "/some-challenges",
              mid: "last",
            },
          ],
        },
        {
          title: "Testing",
          icon: "",
          sub: true,
          hide: false,
          mid: "first",
          isSvg: false,
          size: "9px",
          fontsize: "14px",
          children: [
            {
              title: "Some Testing",
              icon: "",
              isSvg: true,
              size: "9px",
              fontsize: "14px",
              path: "/some-testing/",
              sub: true,
              isActive:
                router.asPath == "/some-testing/" ||
                router.asPath == "/some-testing",
              mid: "last",
            },
          ],
        },
      ],
    },
    {
      title: "Users",
      isSvg: true,
      icon: "/icons/users.png",
      size: "18px",
      fontsize: "14px",
      hide: false,
      children: [
        {
          title: "Admin",
          icon: "",
          size: "8px",
          fontsize: "14px",
          path: "/admin/",
          sub: true,
          isSvg: true,
          mid: "first",
          hide: false,
          isActive: router.asPath == "/admin/" || router.asPath == "/admin",
        },
      ],
    },
  ];
};

export default navigation;
