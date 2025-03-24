import { FC, useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { SaveStatistics } from "@/features/Leaderboard/ui/SaveStatistics";
import { Button } from "@/shared/ui/button";

interface SaveStatisticsModalProps {
  className?: string;
}

const SaveStatisticsModal: FC<SaveStatisticsModalProps> = () => {
  const [opened, setOpened] = useState(false);
  const onSaveHandler = useCallback(() => setOpened(false), [setOpened]);
  return (
    <AlertDialog open={opened} onOpenChange={() => setOpened((prev) => !prev)}>
      <AlertDialogTrigger>
        <Button>Save statistics</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <SaveStatistics onSaveHandler={onSaveHandler} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { SaveStatisticsModal };
