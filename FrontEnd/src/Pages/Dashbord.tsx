/* eslint-disable react-hooks/exhaustive-deps */
 

import { useEffect, useState } from "react";
import { Button } from "../Componants/Button";
import { CreateContentModal } from "../Componants/CreateContentModal";
import { SideBar } from "../Componants/SideBar";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../Config";
import axios from "axios";
import copy from 'copy-to-clipboard';
import { Card } from "../Componants/Card";
import { toast, ToastContainer } from "react-toastify"

export function Dashbord() {
    const [modalOpen, setModalOpen] = useState(false);
    const { Contents, refresh } = useContent();

    console.log(Contents);
  
    useEffect(() => {
      refresh();
    }, [modalOpen]);
  
    return (
      <div className="flex">
        <SideBar />
        <div className="ml-0 md:ml-72 w-full bg-gray-100 min-h-screen border-2 p-4">
          {/* content header */}
          <div className="w-full p-5 bg-red-100 h-[80px] rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center w-full">
              <div className="ml-5 font-semibold text-2xl text-gray-800">All Notes</div>
              <div className="flex gap-4">
                {/* for sharing the brain */}
                <Button
                  onclick={async () => {
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/brain/share`,
                      {
                        share: true,
                      },
                      {
                        headers: {
                          "Authorization": localStorage.getItem("token"),
                        },
                      }
                    );
                    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                    copy(shareUrl);
                    toast.success("Share URL Copied Successfully ClickBoard");
                  }}
                  variant="secondary"
                  text="Share Brain"
                  startIcon={<ShareIcon />}
                />
                {/* for adding the content */}
                <Button
                  onclick={() => setModalOpen(true)}
                  variant="primary"
                  text="Add Content"
                  startIcon={<PlusIcon />}
                />
              </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
          </div>
  
          {/* Modal */}
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
  
          {/* Content Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Contents?.map(({ _id,type, Link, title }) => (
              <Card key={_id} id={_id} type={type} link={Link} title={title} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  