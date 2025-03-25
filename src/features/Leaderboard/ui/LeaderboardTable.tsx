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
      <TableCaption translate="no">A list of leaders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead translate="no">Username</TableHead>
          <TableHead translate="no">Mode</TableHead>
          <TableHead translate="no">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaders.map((leader) => {
          return (
            <TableRow key={leader.id}>
              <TableCell translate="no" className="font-medium">
                {leader.username}
              </TableCell>
              <TableCell translate="no">{leader.statistics.mode}</TableCell>
              <TableCell translate="no">
                {formatTime(leader.statistics.time)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { LeaderboardTable };
