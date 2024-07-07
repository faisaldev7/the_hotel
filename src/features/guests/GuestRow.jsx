/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";

import Table from "../../ui/Table";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import { useDeleteGuest } from "./useDeleteGuest";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-800);
    font-size: 1.2rem;
  }
`;

function GuestRow({
  guest: { id: guestId, fullName, email, nationality, nationalId },
}) {
  const navigate = useNavigate();

  const { isDeleting, deleteGuest } = useDeleteGuest();

  return (
    <Table.Row>
      <Stacked>
        <span>{fullName}</span>
      </Stacked>

      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{nationality}</span>
      </Stacked>

      <Stacked>
        <span>{nationalId}</span>
      </Stacked>

      <Menus.Menu>
        <Menus.Toggle id={guestId} />
        <Menus.List id={guestId}>
          <Menus.Button
            icon={<HiTrash />}
            onClick={() => deleteGuest(guestId)}
            disabled={isDeleting}
          >
            Delete
          </Menus.Button>
          <Menus.Button
            icon={<HiPencil />}
            onClick={() => navigate(`/guests/${guestId}/edit`)}
          >
            Edit
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default GuestRow;
