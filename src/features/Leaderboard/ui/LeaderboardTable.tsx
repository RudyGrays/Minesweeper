import { FC } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useAppSelector } from "@/app/providers/StoreProvider/model/config/Store";

import useTimer from "@/shared/hooks/useTimer";
import { Leader } from "../model/types/LeaderboardTypes";
import { LeaderBoardSelectors } from "../model/selectors/LeaderboardSelectors";

interface LeaderboardTableProps {
  className?: string;
}

const LeaderboardTable: FC<LeaderboardTableProps> = () => {
  const leaders: Leader[] = useAppSelector(LeaderBoardSelectors.leaders);
  const { formatTime } = useTimer();
  return (
    <Table>
      <TableCaption>A list of leaders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Mode</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaders.map((leader) => {
          return (
            <TableRow key={leader.id}>
              <TableCell className="font-medium">{leader.username}</TableCell>
              <TableCell>{leader.statistics.mode}</TableCell>
              <TableCell>{formatTime(leader.statistics.time)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { LeaderboardTable };
