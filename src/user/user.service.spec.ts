import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

describe('UserService', () => {
  let service: UserService;
  const mockSend = vi.fn();

  const mockDynamo = {
    send: mockSend,
  };

  beforeEach(() => {
    mockSend.mockReset(); // limpa mocks a cada teste
    service = new UserService(mockDynamo);
  });

  it('deve criar um usuário', async () => {
    const dto: CreateUserDto = {
      name: 'Guilherme', email: 'gui@email.com',
      type: 'owner'
    };
    mockSend.mockResolvedValueOnce({}); // simula resposta do Dynamo

    const result = await service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(dto.name);
    expect(mockSend).toHaveBeenCalledWith(expect.any(PutCommand));
  });

  it('deve encontrar todos os usuários', async () => {
    mockSend.mockResolvedValueOnce({ Items: [{ id: '1', name: 'Guilherme' }] });

    const users = await service.findAll();

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Guilherme');
    expect(mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));
  });

  it('deve encontrar um usuário', async () => {
    mockSend.mockResolvedValueOnce({ Item: { id: '1', name: 'Guilherme' } });

    const user = await service.findOne('1');

    expect(user).toEqual({ id: '1', name: 'Guilherme' });
    expect(mockSend).toHaveBeenCalledWith(expect.any(GetCommand));
  });

  it('deve atualizar um usuário', async () => {
    const dto: UpdateUserDto = { name: 'Atualizado' };
    mockSend.mockResolvedValueOnce({});

    const result = await service.update('1', dto);

    expect(result).toEqual({ id: '1', name: 'Atualizado' });
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateCommand));
  });

  it('should remove a user', async () => {
    mockSend.mockResolvedValueOnce({});

    const result = await service.remove('1');

    expect(result).toEqual({ deleted: true });
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteCommand));
  });
});
