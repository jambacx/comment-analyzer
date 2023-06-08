import {
  IconSmartHome,
  IconArticle,
  IconReport,
  IconMessageCircle,
  IconSettings
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Цэс"
  },

  {
    id: uniqueId(),
    title: "Нүүр хуудас",
    icon: IconSmartHome,
    href: "/"
  },
  {
    navlabel: true,
    subheader: "Дэлгэрэнгүй"
  },
  {
    id: uniqueId(),
    title: "Нийтлэл",
    icon: IconArticle,
    href: "/posts"
  },
  {
    id: uniqueId(),
    title: "Сэтгэгдэл",
    icon: IconMessageCircle,
    href: "/comments"
  },
  {
    id: uniqueId(),
    title: "Тайлан",
    icon: IconReport,
    href: "/report"
  }
  // {
  //   navlabel: true,
  //   subheader: "Тохиргоо"
  // }
  // {
  //   id: uniqueId(),
  //   title: "Тохиргоо",
  //   icon: IconSettings,
  //   href: "/config"
  // }
];

export default Menuitems;
