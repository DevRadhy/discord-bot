/* eslint-disable no-undef */
import { Client, CommandInteraction, Guild, GuildMember, Role, User } from "discord.js";
import Discord from "../lib/Client";

export class DiscordMock {
  private readonly client: Client;

  public user: User;
  public member: GuildMember;
  public role: Role;
  public guild: Guild;

  public interaction: CommandInteraction;
  
  constructor() {
    this.client = Discord.client;

    this.RoleMock();
    this.UserMock();
    this.MemberMock();
    this.GuildMock();

    this.InteractionMock();
  }

  private InteractionMock() {
    this.interaction = Object.assign(
      Object.create(CommandInteraction),
      {
        data: [],
        id: BigInt(1),
        user: this.user,
        member: this.member,
        guild: this.guild,
        options: {
          data: [],
          getMember: jest.fn(),
          getRole: jest.fn(),
          getSubcommand: jest.fn(),
        },
        reply: jest.fn(),
      }
    );
  }

  private UserMock() {
    this.user = Object.assign(
      Object.create(User),
      {
        id: "53908232506183680",
        username: "Mason",
        avatar: "a_d5efa99b3eeaa7dd43acca82f5692432",
        discriminator: "1337",
        bot: false,
        avatarURL: jest.fn(),
      });
  }

  private MemberMock() {
    this.member = Object.assign(
      Object.create(GuildMember),
      {
        id: "53908232506183680",
        user: this.user,
        roles: {
          add: jest.fn(),
          remove: jest.fn(),
        }
      });
  }

  private RoleMock() {
    this.role = Object.assign(Object.create(Role), {});
  }

  private GuildMock() {
    this.guild = Object.assign(
      Object.create(Guild),
      {
        id: BigInt(1),
        members: {
          kick: jest.fn(),
          ban: jest.fn(),
        },
        me: {
          permissions: {
            has: jest.fn(),
          },
        }
      });
  }
}