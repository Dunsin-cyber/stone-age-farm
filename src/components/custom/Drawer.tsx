"use client";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";

const Drawer = ({
  isOpen,
  handleSubmit = () => {},
  drawerTitle,
  drawerBody,
}) => {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="lg"
      open={isOpen}
      onOpenChange={closeDrawer}
      placement={"bottom"}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" style={{ display: "none" }}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop={"25"} roundedBottom={undefined}>
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>{drawerTitle}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>{drawerBody}</DrawerBody>
        <DrawerFooter mb={6}>
          <Button variant="outline" onClick={closeDrawer}>
            Cancel
          </Button>
          <Button bgColor="blue.800" px={4} onClick={handleSubmit}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
