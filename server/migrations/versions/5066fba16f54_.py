"""empty message

Revision ID: 5066fba16f54
Revises: 64217caf9455
Create Date: 2024-01-10 14:15:36.776682

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5066fba16f54'
down_revision = '64217caf9455'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.alter_column('handle',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('nickname',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('bio',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('password_hash',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.alter_column('password_hash',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('bio',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('nickname',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('handle',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
