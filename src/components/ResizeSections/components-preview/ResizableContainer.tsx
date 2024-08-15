import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Component } from "@/data/components/types";
import { cn, getComponentFileUrl } from "@/lib/utils";
import { useState } from "react";
import { AiFillEye, AiOutlineMobile, AiOutlineTablet } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import { IoIosDesktop } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
import RadioCard from "../RadioCard";
import { CodeSample } from "./CodeExample";
import { ResizableFrame } from "./ResizableFrame";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type ResizableContainerProps = {
  component: Component;
  componentData: { id: string; filename: string; files: string[] }[];
};

const TABS = [
  { label: "Preview", icon: AiFillEye },
  { label: "Code", icon: HiCode },
];

export const ResizableContainer = ({
  component,
  componentData,
}: ResizableContainerProps) => {
  const [viewWidth, setViewWidth] = useState("100%");
  const [tabIndex, setTabIndex] = useState(0);

  const options = [
    { label: "Mobile", type: "preview", width: "380px", icon: AiOutlineMobile },
    { label: "Tablet", type: "preview", width: "768px", icon: AiOutlineTablet },
    { label: "Desktop", type: "preview", width: "100%", icon: IoIosDesktop },
  ];

  const getFiles = () => {
    return (
      componentData.filter((c) => c.filename === component.filename)[0]
        ?.files ?? []
    );
  };

  return (
    <>
      <div className="">
        <div className="flex items-center space-x-2">
          <h2 className="text-md ml-1 pb-2 pt-20 font-light">
            {component.name}
          </h2>
          {component.isNewComponent && (
            <span className="text-xs text-red-600">New</span>
          )}
        </div>
        <div
          className={cn(
            "rounded-2xl border",
            "border-gray-200 dark:border-gray-700",
          )}
          id={component.filename}
        >
          <Tabs
            defaultValue="preview"
            onValueChange={(value) =>
              setTabIndex(
                TABS.findIndex((tab) => tab.label.toLowerCase() === value),
              )
            }
          >
            <div className="flex justify-between p-3">
              <TabsList
                className={cn("rounded-md p-1", "bg-gray-200 dark:bg-gray-700")}
              >
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.label}
                    value={tab.label.toLowerCase()}
                    className={cn("flex items-center space-x-1 px-4 py-2", {
                      ["dark:bg-whiteAlpha-300 rounded-md bg-white text-black shadow-md dark:text-white"]:
                        tabIndex === TABS.indexOf(tab),
                    })}
                  >
                    <span className="text-sm">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex items-center space-x-2">
                
                  <div className="hidden items-center rounded-md bg-gray-200 p-1 dark:bg-gray-700 md:flex gap-2">
                    {options.map((value) => (
                      <RadioCard
                        key={value.label}
                        onChange={() => setViewWidth(value.width)}
                        isChecked={viewWidth === value.width}
                      >
                        <div className="flex items-center space-x-1 ">
                          <value.icon className="h-6 w-6" />
                          {/*<span className="text-sm">{value.label}</span>*/}
                        </div>
                      </RadioCard>
                    ))}
                  </div>
              
                <Link
                  href={getComponentFileUrl(
                    component.filename,
                  )}
                  target="_blank"
                >
                  <Button
                    
                    variant="outline"
                    className="rounded-md"
                    aria-label="Open in Fullscreen"
                    title="Open in Fullscreen"
                  >
                    <BiLinkExternal />
                  </Button>
                </Link>
              </div>
            </div>
            <Separator className="border-gray-200 dark:border-gray-700" />
            <TabsContent value="preview">
              <div className="flex w-full justify-center overflow-hidden rounded-b-2xl bg-gray-100 dark:bg-gray-700">
                <div style={{ width: viewWidth }} className="bg-transparent">
                  <ResizableFrame component={component} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              {getFiles().length ? (
                <Tabs className="unstyled">
                  <div className="p-0.225 flex items-center bg-gray-200 dark:bg-gray-700">
                    <TabsList>
                      {getFiles().map((name, index) => (
                        <TabsTrigger
                          key={index}
                          value={name}
                          className={cn("px-2.5 py-2", {
                            ["rounded-sm bg-white text-black shadow-md dark:bg-gray-900 dark:text-white"]:
                              true,
                          })}
                        >
                          <div className="flex items-center space-x-2">
                            <SiTypescript className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-normal">{name}</span>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <TabsContent value={""}>
                    {getFiles().map((name, index) => (
                      <div
                        key={index}
                        className="w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700"
                      >
                        <CodeSample
                          component={component}
                          nestedComponentFile={name}
                        />
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700">
                  <CodeSample component={component} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
