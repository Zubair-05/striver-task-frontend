import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import '../app.css'

interface Submission {
  username: string;
  language: string;
  source_code: string;
  stdin: string;
  stdout: string;
}

export default function Submissions() {

  const [data, setData] = useState<Submission[]>([]);
  useEffect(() => {
    async function fetchData() {
      const values = await axios.get('http://localhost:3000/submissions');
      setData(values.data.slice().reverse());
    }
    fetchData();
  }, [])

  // data.reverse();  

  return (
    <div className="mx-10 my-10">
      <Table>
        <TableCaption>All the code submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Username</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Source Code</TableHead>
            <TableHead >Stdin</TableHead>
            <TableHead >Stdout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((val) => (
            <TableRow>
              <TableCell className="font-medium">{val.username}</TableCell>
              <TableCell className="font-medium">{val.language}</TableCell>
              <TableCell>
                <div className="flex justify-between">
                  {val.source_code.slice(0, 100)}
                  <Dialog>
                    <DialogTrigger>
                      <Button size="sm">View Code</Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <DialogHeader>
                        <DialogTitle>Source Code</DialogTitle>
                        <DialogDescription >
                          <div >
                            <pre>{val.source_code}</pre>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>

                  </Dialog>

                </div>
              </TableCell>
              <TableCell>{val.stdin}</TableCell>
              <TableCell >{val.stdout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

