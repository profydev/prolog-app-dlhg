import React from "react";
import { Button } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
  rotateIcon?: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
  rotateIcon = false,
}: MenuItemProps) {
  // Check if the button is the "support" button
  if (text === "Support") {
    return (
      <li className={classNames(styles.listItem, className)}>
        <a
          href="mailto:support@prolog-app.com?subject=Support Request:"
          className={styles.anchor}
        >
          <img
            className={classNames(styles.icon, rotateIcon && styles.rotateIcon)}
            src={iconSrc}
            alt={`${text} icon`}
          />
          {!isCollapsed && text}
        </a>
      </li>
    );
  }

  return (
    <li className={classNames(styles.listItem, className)}>
      <Button className={styles.anchor} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={classNames(styles.icon, rotateIcon && styles.rotateIcon)}
          src={iconSrc}
          alt={`${text} icon`}
        />{" "}
        {!isCollapsed && text}
      </Button>
    </li>
  );
}
