import { Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import {type Component } from "@/data/components/types";

import { Resizable } from "re-resizable";
import { getComponentFileUrl } from "@/lib/utils";

type IframeProps = {
  component: Component;
};

const MIN_HEIGHT = 600;
const MIN_WIDTH = 380;

export const ResizableFrame = ({ component }: IframeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [exampleUrl, setExampleUrl] = useState("");

  useEffect(() => {
    setExampleUrl(
      getComponentFileUrl(component.filename),
    );
  }, [component]);

  const syncHeight = () => {
    setHeight(ref.current?.contentWindow?.document.body.offsetHeight);
  };

  useEffect(() => {
    if (ref.current?.contentWindow?.document.body.children.length) {
      ref.current?.contentWindow?.location.reload();
    }
  }, [component]);

  const getHeight = () =>
    height !== undefined && height >= MIN_HEIGHT ? height : MIN_HEIGHT;

  return (
    <Fragment>
      {isMobile ? (
        <iframe
          loading="lazy"
          width="100%"
          height={getHeight()}
          src={exampleUrl}
          ref={ref}
          onLoad={syncHeight}
          className="rounded-b-lg w-full"
        />
      ) : (
        <Resizable
          bounds="parent"
          minWidth={MIN_WIDTH}
          minHeight={getHeight()}
          maxHeight={getHeight()}
          className="rounded-b-lg"
        >
          <iframe
            loading="lazy"
            width="100%"
            height={getHeight()}
            src={exampleUrl}
            ref={ref}
            onLoad={syncHeight}
            className="w-full"
          />
        </Resizable>
      )}
    </Fragment>
  );
};
