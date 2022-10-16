/* eslint-disable no-undef */
import { Client, CommandInteraction, GuildMember, Role, User } from "discord.js";
import Discord from "../lib/Client";

export class DiscordMock {
  private readonly client: Client;

  public user: User;
  public member: GuildMember;
  public role: Role;

  public interaction: CommandInteraction;
  
  constructor() {
    this.client = Discord.client;

    this.RoleMock();
    this.UserMock();
    this.MemberMock();

    this.InteractionMock();
  }

  private InteractionMock() {
    this.interaction = Reflect.construct(CommandInteraction, [
      this.client,
      {
        data: [],
        id: BigInt(1),
        user: this.user,
      },
    ]);

    this.interaction.reply = jest.fn();

    this.interaction.options = {
      ...this.interaction.options,
      data: [],
      getMember: jest.fn(),
      getRole: jest.fn(),
      getSubcommand: jest.fn(),
    };
  }

  private UserMock() {
    this.user = Reflect.construct(User, [
      this.client,
      {
        id: "53908232506183680",
        username: "Mason",
        avatar: "a_d5efa99b3eeaa7dd43acca82f5692432",
        discriminator: "1337",
        bot: false,
        avatarURL: jest.fn(),
      },
    ]);
  }

  private MemberMock() {
    this.member = Reflect.construct(GuildMember, [
      this.client,
      {
        user: this.user,
        permissions: "2147483647",
        roles: [],
      }
    ]);
  }

  private RoleMock() {
    this.role = Reflect.construct(Role, []);
  }
}