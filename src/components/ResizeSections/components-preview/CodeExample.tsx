import { Button } from "@/components/ui/button";
import {type  Component } from "@/data/components/types";
import { useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { CheckIcon, ClipboardIcon } from "lucide-react";

type CodeSampleProps = {
    component: Component;
  nestedComponentFile?: string;
};

export const CodeSample = ({
    component,
}: CodeSampleProps) => {
 
   
     const code = require(
        `!!raw-loader!!@/components/slider/${component.filename}`,
      ).default as string
    

  const [hasCopied, setHasCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative font-mono text-sm" ref={codeRef}>
      <Button size="icon" className="absolute right-4 top-4" onClick={handleCopy}>
        <div className="flex items-center space-x-2">
          <span>{hasCopied ? <CheckIcon/> : <ClipboardIcon/>}</span>
        </div>
      </Button>

      <CodeBlock
        text={code}
        language={"tsx"}
        theme={dracula}
        showLineNumbers={false}
      />
    </div>
  );
};
