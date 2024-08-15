import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { components_list, ComponentsData } from "@/data/components/sliderData";
import { ResizableContainer } from "@/components/ResizeSections/components-preview/ResizableContainer";

export default function BlocksPage() {
  return (
    <main>
      <div className="flex items-center justify-center">
        <PageHeader>
          <PageHeaderHeading className="text-center">
            Building Blocks for the Web
          </PageHeaderHeading>
          <PageHeaderDescription>
            Beautifully designed. Copy and paste into your apps. Open Source.
          </PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <a href="#blocks">Browse Blocks</a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a
                href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
                target="_blank"
              >
                Request a block
              </a>
            </Button>
          </PageActions>
        </PageHeader>
      </div>

      {/*  Sliders */}
      <div className="mx-auto w-full max-w-[1400px] px-4">
        {components_list.map((c, index) => {
          return (
            <ResizableContainer
              key={index}
              componentData={ComponentsData}
              component={c}
            />
          );
        })}
      </div>
    </main>
  );
}
