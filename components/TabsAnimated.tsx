"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

type SelectedTab = "По заявкам" | "Перемещение оборудования" | "Сотрудники";

export function TabsAnimated() {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("По заявкам");
  const container = useRef<HTMLDivElement | null>(null);
  const refOne = useRef<HTMLDivElement | null>(null);
  const refTwo = useRef<HTMLDivElement | null>(null);
  const refThree = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { contextSafe } = useGSAP(
    () => {
      let x = 0;
      let width = refOne?.current?.offsetWidth;

      if (
        pathname === "/tabspage/tab-2" &&
        refOne.current?.getBoundingClientRect().left &&
        refTwo?.current?.getBoundingClientRect().left
      ) {
        x =
          refTwo?.current?.getBoundingClientRect().left -
          refOne.current?.getBoundingClientRect().left;
        width = refTwo?.current?.offsetWidth;
        setSelectedTab("Перемещение оборудования");
      } else if (
        pathname === "/tabspage/tab-3" &&
        refOne?.current?.getBoundingClientRect().left &&
        refThree?.current?.getBoundingClientRect().left
      ) {
        x =
          refThree?.current?.getBoundingClientRect().left -
          refOne?.current?.getBoundingClientRect().left;
        width = refThree?.current?.offsetWidth;
        setSelectedTab("Сотрудники");
      }

      gsap.set(".box", { x, width, opacity: 100 });
      gsap.set(".box-text", { opacity: 100 });
      console.log("useGSAP");
    }
    // [container.current?.offsetWidth]
    // { scope: container }
  );

  const onClickOne = contextSafe(() => {
    router.push("/tabspage/tab-1");
    gsap.to(".box", { x: 0, width: refOne?.current?.offsetWidth });
    setSelectedTab("По заявкам");
  });
  // function onClickOne() {
  //   contextSafe(() => {
  //     gsap.to('.box', { x: 0, width: refOne?.current?.offsetWidth });
  //     setSelectedTab('one');
  //   });
  // }

  const onClickTwo = contextSafe(() => {
    router.push("/tabspage/tab-2");
    if (
      refOne.current?.getBoundingClientRect().left &&
      refTwo?.current?.getBoundingClientRect().left
    ) {
      gsap.to(".box", {
        x:
          refTwo?.current?.getBoundingClientRect().left -
          refOne.current?.getBoundingClientRect().left,
        width: refTwo?.current?.offsetWidth,
      });
      setSelectedTab("Перемещение оборудования");
    }
  });

  const onClickThree = contextSafe(() => {
    router.push("/tabspage/tab-3");
    if (
      refOne?.current?.getBoundingClientRect().left &&
      refThree?.current?.getBoundingClientRect().left
    ) {
      gsap.to(".box", {
        x:
          refThree?.current?.getBoundingClientRect().left -
          refOne?.current?.getBoundingClientRect().left,
        width: refThree?.current?.offsetWidth,
      });
      setSelectedTab("Сотрудники");
    }
  });

  useEffect(() => {
    const handleResize = contextSafe(() => {
      if (selectedTab === "По заявкам") {
        console.log("selectedTab === one");
        gsap.to(".box", {
          x: refOne?.current?.offsetLeft,
          width: refOne?.current?.offsetWidth,
        });
      } else if (
        selectedTab === "Перемещение оборудования" &&
        refOne.current?.getBoundingClientRect().left &&
        refTwo?.current?.getBoundingClientRect().left
      ) {
        console.log("selectedTab === two");
        gsap.to(".box", {
          x:
            refTwo?.current?.getBoundingClientRect().left -
            refOne.current?.getBoundingClientRect().left,
          width: refTwo?.current?.offsetWidth,
        });
      } else if (
        selectedTab === "Сотрудники" &&
        refOne?.current?.getBoundingClientRect().left &&
        refThree?.current?.getBoundingClientRect().left
      ) {
        console.log("selectedTab === three");
        gsap.to(".box", {
          x:
            refThree?.current?.getBoundingClientRect().left -
            refOne?.current?.getBoundingClientRect().left,
          width: refThree?.current?.offsetWidth,
        });
      }
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTab, contextSafe]);

  return (
    <div
      ref={container}
      className="relative mb-2 grid grid-flow-col justify-stretch rounded-lg bg-slate-100 p-1"
    >
      <div
        ref={refOne}
        className="p-1 text-center text-sm font-semibold text-slate-500"
        onClick={() => {
          onClickOne();
        }}
      >
        По заявкам
      </div>
      <div
        ref={refTwo}
        className="p-1 text-center text-sm font-semibold text-slate-500"
        onClick={onClickTwo}
      >
        Перемещение оборудования
      </div>
      <div
        ref={refThree}
        className="p-1 text-center text-sm font-semibold text-slate-500"
        onClick={onClickThree}
      >
        Сотрудники
      </div>
      <div className="box absolute left-1 top-1 w-36 whitespace-nowrap rounded-sm bg-white p-1 text-center text-sm font-semibold opacity-0 shadow-sm">
        <span className="box-text opacity-0">{selectedTab}</span>
      </div>
    </div>
  );
}
