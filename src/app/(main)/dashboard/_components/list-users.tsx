import { getUsers } from "@/resources/users/users.queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const ListUsers = async () => {
  const users = await getUsers();

  return (
    <div className="w-full overflow-x-auto shadow">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified?</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="max-w-[12ch] truncate sm:max-w-none">
                {user.id}
              </TableCell>
              <TableCell className="whitespace-nowrap">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Input
                  type="checkbox"
                  checked={!!user.emailVerified}
                  disabled
                  className="h-5"
                />
              </TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
