import { TabsAnimated } from "@/components/TabsAnimated";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TabsLayout({ children }: Props) {
  return (
    <>
      <TabsAnimated />
      {children}
    </>
  );
}
